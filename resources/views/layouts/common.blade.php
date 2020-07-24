<html>

<head>
  <title>App Name - @yield('title')</title>
  <style>
    * {
      box-sizing: border-box;
    }
    html {
      font-size: 14px;
      font-family: 'Nunito', sans-serif;
    }
    body{
      margin: 0;
    }
    .header {
      display: flex;
      flex-direction: row;
      align-items: :center;
      padding:0 5rem;
    }
    .menu {
      display: flex;
      flex:1;
      align-items: center;
      justify-content: center;
    }
    .menu-item {
      flex:1;
      text-align: center;
    }
    .footer {
      background: #52a0b2;
      color: white;
      display: flex;
      flex-direction: column;
      padding: 0 5rem;
    }
    .content-footer {
      display: flex;
    }
    .col-footer {
      flex:1;
    }
    .full-container {
      position: absolute;
      width: 100%;
    }
    img {
      max-width: 100%;
    }
    .logo {
      width: 10rem;
      margin: 1rem 0;
    }
    .btn {
      background: #338C83;
      padding: 5px 10px;
      color: white;
      border-radius: 30px;
      font-weight: bold;
      border: 0;
    }
    .btn.inverse {
      background: white;
      color: #52a0b2;
    }
    .right-side {
      display: flex;
      align-items: center;
    }
    .section{
      position: relative;
    }
    .container-section {
      flex-direction: row;
      display: flex;
    }
    .section-split {
      flex: 1;
      margin: 0rem 3rem;
    }
    .right-message{
      position: absolute;
      color: white;
      right: 0;
      top: 0;
      font-size: 2.5rem;
      font-weight: 500;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 32rem;
      text-align: right;
      margin-right: 4rem;
    }
    .title {
      font-size: 1.6rem;
      font-weight: 600;
      margin: 15px 0;
    }
    .subtitle {
      font-size: 1.4rem;
      margin: 15px 0;
    }
    .center {
      text-align: center;
    }
    .gradient {
      background: linear-gradient(90deg, rgba(82,160,178,1) 2%, rgba(51,140,131,1) 97%);
      color: white;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

  </style>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,500,600" rel="stylesheet" type="text/css">
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
</head>

<body>
  <div class="full-container">
    <div>
      <i class="fa fa-whatsapp" aria-hidden="true"></i>1895713897
      <i class="fa fa-mail" aria-hidden="true"></i>info@kiru.com
    </div>
    <div class="header">
      <img class="logo" src="\storage\{{setting('site.logo')}}"/>
      
      @section('sidebar')
        <div class="menu">
          <div class="menu-item">
            KIRU
          </div>
          <div class="menu-item">
            Software
          </div>
          <div class="menu-item">
            Precios
          </div>
          <div class="menu-item">
            Blog
          </div>
          <div class="menu-item">
            Contacto
          </div>
        </div>
      @show
      <div class="right-side">
        <a class="btn">Soy Cliente</a>
      </div>
    </div>
    <div class="container">
      @yield('content')
    </div>
  
    <div class="footer">
      <div class="content-footer">
        <div class="col-footer">
          <img />
          <div>info@kiru.com</div>
          <div>2463747</div>
        </div>
        <div class="col-footer">
          <div>FAQ</div>
          <div>Solicitar DEMO</div>
          <div>Blog</div>
        </div>
        <div class="col-footer">
          <img />
          <img />
          <img />
          <img />
          Descarga la Ap
        </div>
      </div>
      <div>Desarrollado por WOW MARKETING</div>
    </div>
  </div>

</body>

</html>