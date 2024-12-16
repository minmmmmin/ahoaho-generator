import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomLoadingButton from "./components/LoadingButton";

import News from "./components/news";//なんか大文字だと怒られる
import Header from "./components/Header";

export default function App() {
  const [joke, setJoke] = useState(null); // ジョークを保存
  // const [isLoading, setIsLoading] = useState(true); // 読み込み中の状態
  const [error, setError] = useState(null); // エラーを保存
  const [image,setImage] = useState(null);
  const [jokeLoading, setJokeLoading] = useState(false);
  const [animalLoading, setAnimalLoading] = useState(false);

  const imagePaths = [//コピーしてきたパスだと怒られるのはなんでなのか
    "images/hebi.PNG",
    "images/hituji.PNG",
    "images/inoshishi.PNG",
    "images/inu.PNG",
    "images/kumasan.png", 
    "images/mogumogurisu.png", 
    "images/monkey.PNG",
    "images/mouse.PNG",
    "images/pig.png",
    "images/piyo.PNG",
    "images/tanuki.png",
    "images/tatu.PNG",
    "images/tora.PNG",
    "images/uma.PNG",
    "images/usagi.PNG",
    "images/usi.PNG",
  ];

  const fetchJoke = async () => {
    setJokeLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single"
      );
      if (!response.ok) {
        throw new Error("ジョークを取得できませんでした");
      }
      const data = await response.json();
      
      let jokeText;
      if (data.type === "single") {
        jokeText = data.joke;
      } else {
        jokeText = `${data.setup} ... ${data.delivery}`;
      }
      setJoke(jokeText);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setJokeLoading(false);
    }
  };
  
  // こういう時のための非同期処理なのね意図的に 500ms した後に画像をランダムに選ぶ処理を入れることでロード演出が出るようになる。
  //jokeのほうはAPIの所得分があるのでそういう作業はしなくてもいい。めんどくせーーやんなきゃよかったな
  const changeImage = async () => {
    setAnimalLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let randomImage = image; // 初期値を現在の画像に設定しておく
      while (randomImage === image) {
        randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
      }
      setImage(randomImage);
    } catch (err) {
      console.error("画像変更に失敗しました:", err);
    } finally {
      setAnimalLoading(false);
    }
  };  


  useEffect(() => {
    fetchJoke();
    changeImage();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
       <Header />
      <h1>あほっこ動物</h1>
      {/* {isLoading && <p>読み込み中...</p>} */}
      <div className="container">
        <img src={image} alt="ahoaho-Animal" />

        {error && <p className="joke" style={{ color: "red" }}>{error}</p>}
        {!error &&<p className="joke">{joke}</p>} {/* 吹き出しはこのpタグだけに適用。!errorってしたらエラーじゃない時に出るようになる->二重吹き出しを防げる */}

      </div>

      <div className="button">
        <CustomLoadingButton loading={jokeLoading} onClick={fetchJoke}>
          新しいジョークを取得
        </CustomLoadingButton>
        <CustomLoadingButton loading={animalLoading} onClick={changeImage}>
          動物を変更
        </CustomLoadingButton>
      </div>

      <div className="news">
      <News />
      </div>

      <Footer />
    </div>
  );
}