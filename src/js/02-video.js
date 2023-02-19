import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_TIME_KEY = 'videoplayer-current-time';

function saveTime({ seconds }) {
  try {
    localStorage.setItem(STORAGE_TIME_KEY, seconds);
  } catch (err) {
    console.error(err);
  }
}

const throttleSaveTime = throttle(saveTime, 1000);

const seconds = Number(localStorage.getItem(STORAGE_TIME_KEY) || 0);
player.setCurrentTime(seconds);

player.on('timeupdate', throttleSaveTime);
