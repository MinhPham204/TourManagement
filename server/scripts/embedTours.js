import { QdrantClient } from '@qdrant/js-client-rest';
import { pipeline } from '@xenova/transformers';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
const Tour = require('../models/Tour.js');
const mongoose = require("mongoose");

dotenv.config();

function mongoIdToUUID(id) {
  // 1. Đệm 8 số 0 vào đầu để đủ 32 ký tự
  const paddedId = id.padStart(32, '0');
  
  // 2. Thêm các dấu gạch nối theo định dạng UUID: 8-4-4-4-12
  return `${paddedId.substring(0, 8)}-${paddedId.substring(8, 12)}-${paddedId.substring(12, 16)}-${paddedId.substring(16, 20)}-${paddedId.substring(20)}`;
}

// 1. Khởi tạo
const qdrant = new QdrantClient({ url: 'http://localhost:6333' });

if (!process.env.MONGODB_URI) {
  console.error("Lỗi: MONGODB_URI không được tìm thấy trong file .env");
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI);

const QDRANT_COLLECTION_NAME = 'tours';

// 2. Tải mô hình AI
console.log('Đang tải mô hình AI. Việc này mất vài phút...');
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
console.log('Tải mô hình thành công!');

const embedTours = async () => {
  // 3. Tạo collection trong Qdrant
  try {
    await qdrant.recreateCollection(QDRANT_COLLECTION_NAME, {
      vectors: { size: 384, distance: 'Cosine' },
    });
    console.log('Đã tạo collection "tours" trên Qdrant.');
  } catch (e) {
    console.error("Lỗi khi tạo collection Qdrant:", e.message);
    mongoose.disconnect();
    return;
  }

  // 4. Lấy tour từ MongoDB
  const tours = await Tour.find({ status: "active" });
  console.log(`Tìm thấy ${tours.length} tour từ MongoDB.`);

  let pointsToUpsert = [];

  for (const tour of tours) {
    const textToEmbed = `
      Tên tour: ${tour.tourName}
      Điểm đến: ${tour.destination}
      Lịch trình: ${tour.itinerary}
      Loại hình: ${tour.tourType}
      Đặc điểm: ${tour.highlights ? tour.highlights.join(', ') : ''}
    `;

    // 6. Tạo vector
    const output = await extractor(textToEmbed, {
      pooling: 'mean', normalize: true,
    });
    const vector = Array.from(output.data);
    const mongoId = tour._id.toString();
    const qdrantId = mongoIdToUUID(mongoId);

    pointsToUpsert.push({
      id: qdrantId, // 
      vector: vector,
      payload: { 
        mongo_id: mongoId 
      }
    });

    console.log(`Đã vector hóa: ${tour.tourName}`);
  }

  // 7. Đẩy đồng loạt lên Qdrant
  if (pointsToUpsert.length > 0) {
    await qdrant.upsert(QDRANT_COLLECTION_NAME, {
      wait: true,
      points: pointsToUpsert,
    });
  }

  console.log(`Hoàn tất! Đã đẩy ${pointsToUpsert.length} vector lên Qdrant.`);
  mongoose.disconnect();
};

embedTours();