/* Javascript for PrismXBlock. */
function PrismXBlockEditBlock(runtime, element) {
    var $element = $(element);

    var lngSelect = document.getElementById('language');
    var thmSelect = document.getElementById('theme');

    var codeMirror = CodeMirror.fromTextArea(document.querySelectorAll('textarea#code-textarea')[0], {
        lineNumbers: true,
        indentWithTabs: true,
        matchBrackets: true,
        lineWrapping: true
    });

    $(element).find('.save-button').bind('click', function(){
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

        var data = {
            display_name: $(element).find('input[name=display_name]').val(),
            code_data: codeMirror.getValue(),
            language: lngSelect.options[lngSelect.selectedIndex].value,
            theme: thmSelect.options[thmSelect.selectedIndex].value,
            maxheight: $(element).find('input[name=maxheight]').val(),

        };
        runtime.notify('save', {state: 'start'});
        $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
        runtime.notify('save', {state: 'end'});
        // console.log(data)
        });
    });

    $(element).find('.cancel-button').bind('click', function() {
        runtime.notify('cancel', {});
    });
}
