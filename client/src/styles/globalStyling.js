import { injectGlobal } from 'styled-components';
import dusha from '../assets/fonts/dusha.ttf'

injectGlobal`
  @font-face {
    font-family: 'dusha';
    src: url(${dusha});
  }

  h1, h2, h3 {
    font-family: dusha;
  }

  h1 {
    font-size: 4rem;
  }

  p, a, li {
    font-family: 'Open Sans', sans-serif;
  }

  a {
    color: gold;
  }

  body {
    background: #0f4583 url("https://www.fifa.com/assets/img/tournaments/17/2018/common/fwc_darkbluebg.png") repeat;
    color: white;
  }
`
