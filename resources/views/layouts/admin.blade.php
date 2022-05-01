@include('includes.head')

@include('includes.styles')

<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

</head>

<body>

    @include('includes.navigation')

    @yield('content')

</body>

@include('includes.footer')

@include('includes.scripts')