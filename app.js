window.addEventListener("load", function() {
    document.getElementById("hello").addEventListener("click", function() {
        document.getElementById("message").innerHTML += "Hello, ";
    });
    document.getElementById("bye").addEventListener("click", function() {
        document.getElementById("message").innerHTML += "Bye, ";
    });
    document.getElementById("exit").addEventListener("click", function() {
        window.history.back();
    });
});