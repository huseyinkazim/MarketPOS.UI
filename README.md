🧾 MarketPOS – Modern POS Uygulaması

React + Vite tabanlı, hızlı ve ölçeklenebilir satış noktası (POS) sistemi
Gerçek dünya perakende senaryoları göz önünde bulundurularak geliştirilmiştir.

🖼️ Demo

👉 
<img width="603" height="794" alt="image" src="https://github.com/user-attachments/assets/c0873ecd-9f50-41d8-b563-403d9a762413" />
<img width="1692" height="604" alt="image" src="https://github.com/user-attachments/assets/0cc51f69-ce18-42ee-b055-3ce040910443" />
<img width="1700" height="873" alt="image" src="https://github.com/user-attachments/assets/298eb62d-cc5a-430e-92b6-5f4c4f6bbac9" />
<img width="1686" height="761" alt="image" src="https://github.com/user-attachments/assets/d0dbaf52-68e2-46ba-ad6d-31796fb92f1b" />
<img width="1683" height="935" alt="image" src="https://github.com/user-attachments/assets/61e429c6-e06f-40e2-96b9-55d8084d8b89" />


🏗️ Teknoloji Stack
⚛️ Frontend: React 18 + Vite
🟦 Language: TypeScript
🎨 UI: Tailwind CSS
📦 State Management: (Redux / Zustand varsa ekle)
🔐 Auth: (JWT)
🐳 Container: Docker
⚙️ Özellikler
🛒 Satış ve sepet yönetimi
📦 Ürün katalog sistemi
💰 Kasa ve bakiye takibi
📊 Raporlama altyapısı
🔐 Authentication sistemi
🧠 Mimari Yaklaşım

Bu proje sadece UI değil, gerçek sistem mantığıyla tasarlanmıştır:

Component-based yapı
Reusable UI pattern’leri
API-first yaklaşım
Modüler klasör yapısı
Production-ready build (Docker + Nginx)

Microservice uyumlu frontend tasarımı
Event-driven sistemlere entegre edilebilir yapı
🐳 Docker ile Çalıştırma
Build
docker build -t marketpos .
Run
docker run -d -p 3000:80 --name marketpos marketpos

👉 Aç:

http://localhost:3000

💻 Local Development
npm install
npm run dev

🚀 Roadmap
 Backend entegrasyonu (.NET Core API)
 Redis cache
 Offline satış desteği
 Multi-tenant yapı
 CI/CD pipeline

🧑‍💻 Geliştirici Notu

Bu proje, gerçek dünyadaki POS sistemlerinin ihtiyaçları düşünülerek
performans, ölçeklenebilirlik ve kullanıcı deneyimi odağında geliştirilmiştir.

📄 Lisans

MIT
