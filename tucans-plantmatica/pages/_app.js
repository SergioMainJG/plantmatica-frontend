import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

fetch(`http://localhost:3000/api/users`)
.then( val => val.json().then( console.logs ) )
.catch(console.error);

export default MyApp
