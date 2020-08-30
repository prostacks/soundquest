import React from "react";

const LyricsForm = () => {
  return (
    <div>
      <form
        className='col-md-6 mx-auto mt-5'
        method='POST'
        action='https://api.audd.io/findLyrics/'
      >
        <div className='form-group'>
          <label className='text-light' htmlFor='textArea'>
            Get matches to song info by typing in a few lyrics
          </label>
          <textarea
            className='form-control'
            placeholder='Enter Lyrics Here'
            id='textArea'
            rows='5'
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Search
        </button>
      </form>
    </div>
  );
};

export default LyricsForm;
