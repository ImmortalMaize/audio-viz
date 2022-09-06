import audio from "../songs/audio.wav"

export interface VisualiserConfig {
  from: number;
  track: {
    title: string;
    artist: string;
    art: string;
    audio: string;
  };
  gradient: [string, string];
  process: {
    minDb: number;
    maxDb: number;
    dernierTwitch: number;
  }
}

export const defaults: Array<VisualiserConfig> = [{
  from: 0,
  track: {
    title: "Dream",
    artist: "DJ Kuroneko",
    art: "https://m.media-amazon.com/images/I/81JCMHA84kL._SS500_.jpg",
    audio: audio
  },
  gradient: ["#fcd303", "#00a9d4"],
  process: {
    minDb: -40,
    maxDb: -100,
    dernierTwitch: 1
  }
}]