function toCurrency(price){
    price.textContent = new Intl.NumberFormat('en-EN',{
        currency: 'usd',
        style: 'currency'
    }).format(price.innerHTML)
}
function toDate(date) {
    return new Intl.DateTimeFormat('en-En',{
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date))
  }


document.querySelectorAll('.date-order').forEach(c=>{
    c.textContent = toDate(c.textContent)
})

document.querySelectorAll('.price').forEach(c => toCurrency(c))

const $card = document.querySelector('#card');
if($card){
    $card.addEventListener('click',(event)=>{
        if(event.target.classList.contains('js-remove') ){
            const id = event.target.dataset.id 
            
            fetch('/card/remove/'+id,{
                method:'delete'
            }).then(data=> data.json())
            .then(cart=>{
               if(cart.equips.length){
                const html = cart.equips.map(c=>{
                    console.log(c);
                    return `  <tr>
                    <td style="font-family: Verdana; font-weight: 700;">${c.title}</td>
                    <td style="font-weight: 600; font-size: 20px; text-align: center;">${c.count}</td>
                    <td style="font-weight: 600; font-size: 20px;" class="price">${c.price}</td>
                    <td>
                        <button class="btn btn-small js-remove" data-id="${c._id}" type="submit">Cancel</button>
                    </td>
                </tr>`
                }).join('')


                $card.querySelector('#total-price').textContent = cart.price
                $card.querySelector('tbody').innerHTML = html
                 $card.querySelectorAll('.price').forEach(c=> toCurrency(c))
               }
               else{
                $card.innerHTML ='<p>Shoplist is empty!!!</p>'
               }
             

            })

        }

    })
}



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
     M.Collapsible.init(elems, {});
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {});
  });

  const el =document.querySelectorAll('.tabs');
    M.Tabs.init(el, {})