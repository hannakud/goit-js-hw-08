import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_TIME_KEY = 'videoplayer-current-time';

function saveTime({ seconds }) {
  localStorage.setItem(STORAGE_TIME_KEY, seconds);
}
const throttleSaveTime = throttle(saveTime, 1000);
player.on('timeupdate', throttleSaveTime);

const seconds = Number(localStorage.getItem(STORAGE_TIME_KEY) || 0);
player.setCurrentTime(seconds);
