import { Form, FormControl } from "react-bootstrap";

export default function Banner() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className='p-4 text-center bg-black'
        // style={{ backgroundImage: "url('https://milnersblog.files.wordpress.com/2019/10/star-wars-episode-9-the-rise-of-skywalker-theatre-movie-poster-textless-and-expanded-web-banner.jpg?w=1200')", backgroundRepeat:"no-repeat"}}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-00'>
            <div className='text-white'>
              <h1 className='mt-5 mb-3'>Victoria's Film List</h1>
              <h2 className='mb-5'>Trending movies and shows today</h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
