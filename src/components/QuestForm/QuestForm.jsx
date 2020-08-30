import React from "react";

const QuestForm = () => {
  return (
    <div>
      <form
        className='col-md-6 mx-auto mt-5'
        method='POST'
        action='https://api.audd.io/findLyrics/'
      >
        <div className='form-group'>
          <label className='text-light' htmlFor='artist'>
            Find Lyrics and more info by entering artist and track name
          </label>
          <input
            className='form-control'
            id='artist'
            placeholder='Artist Name'
            type='text'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Song Title'
            id='songTitle'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Get Song Info
        </button>
      </form>
    </div>
  );
};

export default QuestForm;
