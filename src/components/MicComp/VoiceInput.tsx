import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import React, { useState, useEffect, useCallback } from "react";
import { chatApi } from "../../services/chatApi";
import style from "./style.module.css";
import { micOffSharp, mic } from "ionicons/icons";

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

  /////////////speaking part//////////
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(answer?.response);
    setUtterance(u);

    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    synth.addEventListener("voiceschanged", () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
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
      console.log("playyyyy   2");

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
      console.log(data);
      setAnswer(data);
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

      <p>{transcript}</p>
      <p> {!loading && previousRes?.Answer}</p>
      {loading && <IonSpinner name="dots" />}
    </div>
  );
};

export default VoiceInput;
