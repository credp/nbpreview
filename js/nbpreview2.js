    var notebook;
    var $holder = document.querySelector("#notebook-holder");

    var render_notebook = function (ipynb) {
        $holder = document.querySelector("#notebook-holder");
        notebook = nb.parse(ipynb);
        while ($holder.hasChildNodes()) {
            $holder.removeChild($holder.lastChild);
        }
        $holder.appendChild(notebook.render());
        Prism.highlightAll();
    };

    var load_file = function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var parsed = JSON.parse(this.result);
            render_notebook(parsed);
        };
        reader.readAsText(file);
    };

    function open_uri(MY_URL) {
        var request = new XMLHttpRequest();
        request.open('GET', MY_URL, true);
        request.onload = function() {
            var parsed = JSON.parse(request.response);
            render_notebook(parsed);
        };
        request.send();
    };
