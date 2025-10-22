# ☀️ Hava Durumu Sorgulama Uygulaması

Bu proje, React ve Tailwind CSS kullanılarak geliştirilmiş, OpenWeatherMap API'si ile gerçek zamanlı hava durumu verilerini gösteren basit bir uygulamadır.

## Canlı Versiyon (Live Demo)

Uygulamanın çalışan versiyonuna aşağıdaki linkten ulaşabilirsiniz:
[Hava Durumu Uygulaması] **(https://hava-durumu-woad.vercel.app/)**

## 💻 Teknolojiler

* **React (TypeScript):** Kullanıcı arayüzü (UI) için
* **Tailwind CSS:** Hızlı ve modern arayüz tasarımı için (utility-first CSS framework)
* **Axios:** API çağrıları yapmak için
* **OpenWeatherMap API:** Hava durumu verilerinin kaynağı
* **Vercel:** Kolay ve hızlı deployment (yayına alma) platformu

## 🚀 Başlangıç

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Ön Koşullar

* Node.js (LTS sürümü önerilir)
* npm veya yarn
* Bir adet [OpenWeatherMap API Anahtarı](https://openweathermap.org/api)

### Kurulum Adımları

1.  Projeyi klonlayın:
    ```bash
    git clone [https://github.com/kullaniciadiniz/hava-durumu.git](https://github.com/kullaniciadiniz/hava-durumu.git)
    cd hava-durumu
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  **.env.local Dosyasını Oluşturun:**
    Projenin kök dizininde `.env.local` adında bir dosya oluşturun ve API anahtarınızı ekleyin:
    ```
    REACT_APP_WEATHER_API_KEY=SİZİN_OPENWEATHERMAP_ANAHTARINIZ
    ```

4.  Uygulamayı başlatın:
    ```bash
    npm start
    ```
    Uygulama `http://localhost:3000` adresinde açılacaktır.

## 📝 Özellikler

* Şehir adına göre anlık hava durumu sorgulama.
* Sıcaklık (Celcius), nem, rüzgar hızı ve basınç gösterimi.
* API hatalarında kullanıcı dostu geri bildirim (Örn: "Şehir bulunamadı").
* Duyarlı (Responsive) arayüz tasarımı.