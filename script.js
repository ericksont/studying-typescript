(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTime(val) {
        const min = Math.floor(val / 60000);
        const sec = Math.floor((val % 60000) / 1000);
        return `${min}m and ${sec}s`;
    }
    function parking() {
        function read() {
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];
        }
        function add(vehicle, saved) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.licencePlate}</td>
                <td>${vehicle.entrance}</td>
                <td> 
                    <button class="delete" data-plate="${vehicle.licencePlate}"> X </button>
                </td>
            `;
            (_a = $("#parking")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            (_b = row.querySelector(".delete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
                remove(this.dataset.plate);
            });
            if (saved)
                save([...read(), vehicle]);
        }
        function remove(licensePlate) {
            const { entrance, name } = read().find(vehicle => vehicle.licencePlate === licensePlate);
            const time = calcTime(new Date().getTime() - new Date(entrance).getTime());
            if (!confirm(`Vehicle ${name} stayed for ${time}. Want to close?`))
                return;
            save(read().filter(vehicle => vehicle.licencePlate !== licensePlate));
            render();
        }
        function save(vehicle) {
            localStorage.setItem("parking", JSON.stringify(vehicle));
        }
        function render() {
            $("#parking").innerHTML = "";
            const parking = read();
            if (parking.length) {
                parking.forEach(vehicle => add(vehicle));
            }
        }
        return { read, add, remove, save, render };
    }
    parking().render();
    (_a = $("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const NAME = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const LICENSE_PLATE = (_b = $("#license-plate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!NAME || !LICENSE_PLATE) {
            alert("vehicle and license plate are required");
            return;
        }
        parking().add({ name: NAME, licencePlate: LICENSE_PLATE, entrance: new Date().toISOString() }, true);
    });
})();
