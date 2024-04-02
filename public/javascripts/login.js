const PAGE = {
    init:function(){
      this.bind();
    },
    bind:function(){
      $('#submit').on('click',this.handleSubmit);
    },
    handleSubmit:function(){
      let password = $('#password').val();
      let email = $('#email').val();

      if(!password || !email){
        alert('params empty!')
        return
      }
      console.log(email,password)
      $.ajax({
          url: '/api/login',
          data: { email, password},
          type: 'POST',
          success: function(data) {
            if(data.code === 200){
              alert('登录成功！')
              location.reload()
            }else{
              alert('登录失败，没有此用户！');
              console.log(data)
            }
          },
          error: function(err) {
            console.log(err)
          }
      })
    }
  }

  PAGE.init();