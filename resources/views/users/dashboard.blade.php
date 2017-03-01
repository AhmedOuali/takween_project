@extends('users.layouts.app') 
@section('title', 'test') 
@section('content')
<div class="content-wrapper">
    
    <section class="content">
        <div class="row" style="padding-bottom:20px;">
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-aqua"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                       <span class="text">Note de A</span> 
                       <span class="info-box-number">?/10 &nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-red"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                        <span class="text">Note de B</span> 
                       <span class="info-box-number">?/10 &nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <div class="clearfix visible-sm-block"></div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-green"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                        <span class="text">Note de C</span> 
                       <span class="info-box-number">?/10&nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-yellow"><i class="fa fa-dot-circle-o"></i></span>
                    <div class="info-box-content">
                        <span class="text">Note de D</span> 
                        <span class="info-box-number">?/10&nbsp;<small>points</small></span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
            </div>
        </div>
        <br><br>
        
    </section>
</div>

@endsection
