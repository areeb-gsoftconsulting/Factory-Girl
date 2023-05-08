import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { chatApi } from "../../services/chatApi";
import style from "./style.module.css";
import { micOffSharp, mic } from "ionicons/icons";
import CartContext from "../../context/cartContext";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const recognition = new SpeechRecognition();

interface Props {
  onStart: () => void;
  onStop: (text: string) => void;
}

const VoiceInput: React.FC<Props> = ({ onStart, onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState<any>(false);
  const [answer, setAnswer] = useState<any>("");
  const [isPaused, setIsPaused] = useState<any>(false);
  const [utterance, setUtterance] = useState<any>(null);
  const [voice, setVoice] = useState<any>(null);
  const [pitch, setPitch] = useState<any>(1);
  const [rate, setRate] = useState<any>(1);
  const [volume, setVolume] = useState<any>(1);
  const [previousRes, setPreviousRes] = useState<any>("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { addItem, items } = useContext(CartContext);

  /////////////speaking part//////////
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(answer?.response);
    setUtterance(u);

    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    synth.addEventListener("voiceschanged", () => {
      const voices = synth.getVoices();
      const femaleVoices = voices.filter(
        (voice: any) => voice.lang == "en-US" && voice.name == "Victoria"
      );
      console.log("==>", femaleVoices);

      // Set the default voice to the first female voice in the list

      setVoice(femaleVoices[0]);
    });

    return () => {
      synth.cancel();
      synth.removeEventListener("voiceschanged", () => {
        setVoice(null);
      });
    };
  }, [answer?.response]);

  console.log({ answer });
  const synth = window.speechSynthesis;
  console.log("====>", synth.speaking);

  const handlePlay = () => {
    console.log("playyyyy");

    if (isPaused) {
      console.log("playyyyy 1");

      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      console.log("utterance", utterance, "==>", synth);
      synth.speak(utterance);
      utterance.onend = () => {
        setAnswer("");
        startRecording();
      };
    }

    setIsPaused(false);
  };

  useEffect(() => {
    if (answer?.response?.length > 0) {
      console.log("areeb", answer?.response);
      handlePlay();
    }
  }, [utterance?.text]);

  useEffect(() => {
    if (
      answer?.response?.length > 0 &&
      answer?.response?.toLowerCase() == "stop"
    ) {
      console.log("areeb", answer?.response);
      handleStop();
    }
  }, [answer?.response]);

  const handleStop = () => {
    console.log("stopped");
    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };
  ////////////////////

  useEffect(() => {
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      console.log({ text });
      setTranscript(text);
    };

    recognition.onerror = (event: any) => {
      console.log(event.error);
      if (event.error == "no-speech") {
        // recognition.stop();
        console.log("==>err");
        recognition.abort();
      }
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    return () => {
      recognition.abort();
      // recognition.stop();
    };
  }, [isRecording]);

  const apiCall = async () => {
    console.log("run");

    try {
      setLoading(true);
      //   let res = await fetch("https://menuopenai.obenan.com/menu", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ question: transcript }),
      //   });
      let data = await chatApi({
        message: transcript,
        user_id: "0",
        new_chat: isFirstRender ? "1" : "0",
      });
      console.log("aree==>", data);
      setAnswer(data);
      if (data?.formatted_order) {
        addItem({
          items: [...items, ...data?.formatted_order],
        });
      }
      setPreviousRes(data);
      setIsFirstRender(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log({ error });
    }
  };
  useEffect(() => {
    if (transcript.length > 0) {
      stopRecording();
      apiCall();
    }
  }, [transcript]);
  console.log({ transcript });

  const startRecording = useCallback(() => {
    handleStop();
    recognition.abort();
    onStart();
    setIsRecording(true);
    setTranscript("");
    recognition.start();
  }, [onStart]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    recognition.abort();
    // recognition.stop();
    onStop(transcript);
    // setTranscript("");
  }, [onStop, transcript]);

  return (
    <div className={style.micContainer}>
      {/* {answer?.response && transcript ? (
        <p className={style.msg}>{transcript}</p>
      ) : null} */}

      {transcript && !answer?.response && (
        <p className={style.msg}>{transcript}</p>
      )}
      <br />
      <br />
      {!loading && previousRes?.response ? (
        <p className={style.msg}> {previousRes?.response}</p>
      ) : null}

      {/* <p className={style.msg}> {!loading && previousRes?.response}</p> */}
      {loading && <IonSpinner name="dots" />}
      <div
        className={style.micButton}
        color="danger"
        onClick={isRecording ? stopRecording : startRecording}
      >
        <IonIcon
          size="large"
          slot="icon-only"
          color="warning"
          icon={isRecording ? mic : micOffSharp}
        ></IonIcon>
        {/* <p>{isRecording ? "Stop" : "Start"} Listening</p> */}
      </div>
    </div>
  );
};

export default VoiceInput;
