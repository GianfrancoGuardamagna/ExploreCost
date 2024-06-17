document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        const url = window.location.href;
        const index = url.indexOf('purchaseid=')
        if (index !== -1) {
            const purchaseIdIndex = index + 'purchaseID='.length
            const purchaseId = parseInt(url.substring(purchaseIdIndex))
            Swal.fire({
                title: "Gracias por su compra!",
                html: `<p>Desde el equipo de ExploreCost le queremos agradecer por confiar en nuestro servicio!</p>
                    <p>Porfavor corrobore en su correo electrónico haber recibido la confirmación de compra con los datos de su ticket. En caso de no haberlo recibido en las proximas 24hs, le pedimos que se contacte con el equipo de Atención al Cliente e <strong>indique que el numero de su compra es ${purchaseId}</strong></p>`,
                showCancelButton: true,
            })
            localStorage.clear
        } else {
            Swal.fire({
                title: "Bienvenido a ExploreCost!",
                html: `<p>Donde encontrarás todo lo que buscas para tu local</p>
                    <p>Recuerda que todos nuestros <strong>envíos son gratis</strong> dentro de la península y en el mejor tiempo del mercado. Así también recuerda que <strong>todos los precios que están en la página son con IVA incluido</strong>.</p>`,
                showCancelButton: true,
            })
        }
    }, 2100);


})