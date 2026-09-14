# HTML Showcase

เว็บรวมไฟล์ HTML สำหรับเผยแพร่ด้วย GitHub Pages ทุกครั้งที่ push ขึ้น branch `main` ระบบจะค้นหาไฟล์ `.html` และอัปเดตหน้าแกลเลอรีให้อัตโนมัติ

## เพิ่มผลงาน

1. สร้างโฟลเดอร์ใหม่ เช่น `projects/my-demo/`
2. วางไฟล์ HTML ลงไป เช่น `projects/my-demo/index.html`
3. ใส่ `<title>ชื่อผลงาน</title>` เพื่อกำหนดชื่อที่แสดงบนหน้าแกลเลอรี
4. commit และ push ขึ้น GitHub

ระบบรองรับไฟล์ HTML หลายไฟล์และค้นหาไฟล์ในโฟลเดอร์ย่อยให้เอง โดยไม่รวม `index.html` ที่อยู่หน้าแรกของ repository

## เปิด GitHub Pages

1. สร้าง repository แบบ **Public** บน GitHub
2. push โค้ดนี้ขึ้น branch `main`
3. ไปที่ **Settings → Pages**
4. ในหัวข้อ **Build and deployment → Source** เลือก **GitHub Actions**
5. รอ workflow ชื่อ **Deploy HTML Showcase to GitHub Pages** ทำงานเสร็จ

เว็บจะอยู่ที่ `https://USERNAME.github.io/REPOSITORY/`

## ดูในเครื่อง

สร้างรายการล่าสุดก่อนเปิดเว็บ:

```bash
node scripts/build-gallery.mjs
```

จากนั้นเปิดผ่าน local web server เช่น:

```bash
python -m http.server 8000
```

แล้วเข้า `http://localhost:8000`
