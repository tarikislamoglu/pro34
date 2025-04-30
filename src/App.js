import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";

// Aşağıdaki App bileşeni, kullanıcı oturum bilgilerini yöneten SessionContext oluşturuyor.
// Ancak şu anda oturum yönetimi statik ve kullanıcı giriş/çıkış işlemleri yok.
// Amacınız Context API ile oturum yönetimini daha işlevsel hale getirmek ve Tailwind CSS ile etkileşimi artırmak.

// ✅ SessionContext.Provider içinde oturum durumunu (session) yönetmek için bir useState ekleyin.
// ✅ Kullanıcı çıkış yaptığında session bilgisini null yaparak oturumu kapatma işlemini gerçekleştirin.
// ✅ Kullanıcı çıkış yaptığında avatar yerine "Giriş Yap" butonu gösterilsin ve butona tıklandığında sahte bir giriş işlemi gerçekleştirilsin (setSession({ name: "Namık Korona", initials: "NK" }) gibi).
// ✅ Kullanıcı giriş yaptıysa, Header bileşeninde avatarı ve adını gösterin, çıkış yapma butonu ekleyin.
// ✅ Kullanıcı giriş yapmadıysa, Avatar bileşeni yerine "Giriş Yap" butonu gösterin ve tıklanınca giriş işlemi başlasın.
// ✅ Oturum durumu değiştiğinde, Context sağlayıcısı içindeki bileşenlerin yeniden render olmasını sağlayın.

// Bonus:
// ✨ Avatarın üzerine gelindiğinde scale-110 transition-transform ile hafif büyüme efekti ekleyin.
// ✨ Kullanıcı giriş yaptığında "Hoş geldiniz, [isim]" şeklinde yukarıdan kayarak gelen bir bildirim gösterin (animate-slide-down).
// ✨ Çıkış butonu tıklanınca buton animate-spin ile kısa süreli dönsün ve ardından kaybolsun.
// ✨ Kullanıcı giriş yapmadığında avatar yerine boş bir çember ve giriş ikonuyla bir buton ekleyin (border border-gray-400 text-gray-600).
// ✨ Dark mode desteği ekleyerek, koyu temada avatar arka plan rengini bg-gray-700 yapın.
// ✨ Header’ı sabit hale getirerek (fixed top-0 w-full) sayfa kaydırıldığında sabit kalmasını sağlayın.

const SessionContext = createContext(null);

export default function App() {
  const [session, setSession] = useState(null);
  const [welcome, setWelcome] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (session) {
      setWelcome(`Welcome , ${session.name}`);
      const timeOutId = setTimeout(() => {
        setWelcome(null);
      }, 6000);
      return () => clearTimeout(timeOutId);
    }
    if (!session) {
      setIsAnimating(true);
      const timeOutId = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession, isAnimating }}>
      <div className="bg-white">
        <Header />
        {welcome && (
          <p className="absolute top-30 left-1/2 transform -translate-x-1/2  ">
            {welcome}
          </p>
        )}

        <Hero />
      </div>
    </SessionContext.Provider>
  );
}

function Header() {
  const { session, setSession, isAnimating } = useContext(SessionContext);

  return (
    <header className=" inset-x-0 top-0 z-50 w-full fixed">
      <nav
        className="flex items-center justify-between p-6 lg:px-8 w-full "
        aria-label="Global"
      >
        <Logo />
        <div className="flex space-x-5">
          <Avatar />
          <button
            className={`cursor-pointer ${isAnimating ? "animate-spin" : ""}`}
            onClick={() => {
              if (session) {
                setSession(null);
              } else {
                setSession({ name: "Namık Korona", initials: "NK" });
              }
            }}
          >
            {session ? "Log Out" : "Sign In"}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Avatar() {
  const { session } = useContext(SessionContext);
  if (!session) {
    return (
      <span className=" inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 text-gray-600"></span>
    );
  }

  return (
    <div className="items-center space-x-2 flex lg:flex-1 lg:justify-end transform transition-transform hover:scale-110 duration-300 ease-in-out  cursor-pointer">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 ">
        <span className="text-lg font-medium leading-none text-white ">
          {session.initials}
        </span>
      </span>
      <span>{session.name}</span>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Şirketiniz</span>
        <Image
          className="h-8 w-auto"
          src="/mark.svg"
          alt="Tailwind Logo"
          width={500}
          height={500}
        />
      </a>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Bir sonraki finansman turumuzu duyuruyoruz.{" "}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Daha fazla bilgi edinin <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Online işinizi zenginleştirecek veriler
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Başlamak için
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Daha fazla bilgi edinin <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
