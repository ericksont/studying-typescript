(function(){
    const $ = (query:string):HTMLInputElement | null=>document.querySelector(query);

    $("#submit")?.addEventListener("click",()=> {
        const NAME = $("#name")?.value;
        const LICENCE_PLATE = $("#license-plate")?.value;

        if(!NAME || !LICENCE_PLATE) {
            alert("vehicle and license plate are required");
            return;
        }
    })
})();