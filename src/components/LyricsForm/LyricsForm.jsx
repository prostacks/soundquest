import React from "react";

const LyricsForm = (props) => {
  return (
    <div>
      <div
        className='alert alert-danger mt-3 col-md-6 mx-auto fade'
        role='alert'
      >
        Please enter at least 10 valid characters to perform search!
      </div>
      <form
        className='col-md-6 mx-auto mt-2'
        // method='POST'
        // action='https://api.audd.io/findLyrics/'
      >
        <div className='form-group'>
          <label className='text-light' htmlFor='textArea'>
            Get matches to song info by typing in a few lyrics
          </label>
          <textarea
            required
            className='form-control'
            placeholder='Enter Lyrics Here'
            id='textArea'
            rows='5'
          ></textarea>
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={(e) => {
            e.preventDefault();
            let input = document.querySelector("textarea");
            if (input.value.length < 10 || input.value === "") {
              props.showAlert();
              return;
            }
            props.handleData(input.value);
            input.value = "";
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default LyricsForm;
