
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const logout_beep = () => {
    const select = new Sound(require('../../assets/sounds/logout_beep.mp3'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      select.play((success) => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  const select_beep = () => {
    const select = new Sound(require('../../assets/sounds/select_beep.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      select.play((success) => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  const sweep = () => {
    const select = new Sound(require('../../assets/sounds/clear.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      select.play((success) => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  const err_beep = () => {
    const select = new Sound(require('../../assets/sounds/error.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      select.play((success) => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  export {logout_beep, select_beep, sweep, err_beep};