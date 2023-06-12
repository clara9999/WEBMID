$(function(){
    $("[type='checkbox']").on("change",updateProgress);
});

function updateProgress(){
    let hasChecked=0;
    for(let x=0;x<$("[type='checkbox']").length;x++){
        if($("[type='checkbox']")[x].checked){
            hasChecked+=1;
        }
    }
    // $("meter").attr("min",0);
    $("meter").attr("max", $("[type='checkbox']").length);
    $("meter").attr("value", hasChecked);
}
$(function(){
    $("[type='checkbox']").on("change", function() {
        if(this.checked){
            $(this).next().css({
                'text-decoration': 'line-through',
                'color': 'grey'
            });
        } else {
            $(this).next().css({
                'text-decoration': 'none',
                'color': 'black'
            });
        }
    });
});
