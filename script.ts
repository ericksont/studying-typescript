interface Vehicle {
    name: String;
    licencePlate: String;
    entrance: Date | string;
}

(function(){
    const $ = (query:string):HTMLInputElement | null=>document.querySelector(query);

    function calcTime(val:number){
        const min = Math.floor(val/60000);
        const sec = Math.floor((val%60000) / 1000);
        return `${min}m and ${sec}s`;
    }

    function parking(){
        function read():Vehicle[]{
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];
        }
        function add(vehicle:Vehicle, saved?:Boolean){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.licencePlate}</td>
                <td>${vehicle.entrance}</td>
                <td> 
                    <button class="delete" data-plate="${vehicle.licencePlate}"> X </button>
                </td>
            `;
            $("#parking")?.appendChild(row);

            row.querySelector(".delete")?.addEventListener("click", function(){
                remove(this.dataset.plate)
            });

            if(saved)
                save([...read(), vehicle]);
        }
        function remove(licensePlate:String){
            const {entrance, name} = read().find(vehicle=>vehicle.licencePlate === licensePlate)
            const time = calcTime(new Date().getTime() - new Date(entrance).getTime());
            if(!confirm(`Vehicle ${name} stayed for ${time}. Want to close?`))
                return;
            save(read().filter(vehicle=>vehicle.licencePlate !== licensePlate));
            render();
        }

        function save(vehicle:Vehicle[]){
            localStorage.setItem("parking", JSON.stringify(vehicle))
        }
        function render(){
            $("#parking")!.innerHTML = "";
            const parking = read();
            if(parking.length){
                parking.forEach(vehicle => add(vehicle));
            }
        }

        return {read, add, remove, save, render}
    }

    parking().render();
    $("#submit")?.addEventListener("click",()=> {
        const NAME = $("#name")?.value;
        const LICENSE_PLATE = $("#license-plate")?.value;

        if(!NAME || !LICENSE_PLATE) {
            alert("vehicle and license plate are required");
            return;
        }
        parking().add({name:NAME, licencePlate:LICENSE_PLATE, entrance: new Date().toISOString()}, true);
    })
})();