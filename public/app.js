function toCurrency(price){
    price.textContent = new Intl.NumberFormat('en-EN',{
        currency: 'usd',
        style: 'currency'
    }).format(price.innerText)
}

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
                    return `  <tr>
                    <td style="font-family: Verdana; font-weight: 700;">${c.title}</td>
                    <td style="font-weight: 600; font-size: 20px; text-align: center;">${c.count}</td>
                    <td style="font-weight: 600; font-size: 20px;" class="price">${c.price}</td>
                    <td>
                        <button class="btn btn-small js-remove" data-id="${c.id}" type="submit">Cancel</button>
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