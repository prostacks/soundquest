import React from "react";

const QuestForm = (props) => {
  return (
    <div>
      <div
        className='alert alert-danger mt-3 col-md-6 mx-auto fade'
        role='alert'
      >
        Please enter a valid Artist & Song Title!
      </div>
      <form
        className='col-md-6 mx-auto mt-2'
        method='POST'
        action='https://api.audd.io/findLyrics/'
      >
        <div className='form-group'>
          <label className='text-light' htmlFor='artist'>
            Find Lyrics and more info by entering artist and track name
          </label>
          <input
            className='form-control'
            required
            id='artistName'
            placeholder='Artist Name'
            type='text'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            required
            type='text'
            placeholder='Song Title'
            id='songTitle'
          />
        </div>
        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            let artist = document.getElementById("artistName");
            let title = document.getElementById("songTitle");
            if (!artist.value || !title.value) {
              props.showAlert();
              return;
            }
            let data = `${artist.value} ${title.value}`;
            props.handleData(data);
            artist.value = "";
            title.value = "";
          }}
          className='btn btn-primary'
        >
          Get Song Info
        </button>
      </form>
    </div>
  );
};

export default QuestForm;
