window.addEventListener("load", function() {
    document.getElementById("hello").addEventListener("click", function() {
        document.getElementById("message").textContent += "Hello, ";
    });
    document.getElementById("bye").addEventListener("click", function() {
        document.getElementById("message").textContent += "Bye, ";
    });

    // 表示内容を通知として出力する
    document.getElementById("submit").addEventListener("click", function() {
        const message = document.getElementById("message").textContent;

        // 初回のみ、ブラウザ標準の許可ダイアログが表示される(許可済みならそのまま実行)
        Notification.requestPermission()
            .then(function(result) {
                if(result === 'granted') {
                    // インスタンスを生成するだけで通知が表示される
                    new Notification("ユーザ操作による通知", { body: message })
                }
            });
    });
});
