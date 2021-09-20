document.querySelectorAll('.price').forEach(price =>{
    price.textContent = new Intl.NumberFormat('en-EN',{
        currency: 'usd',
        style: 'currency'
    }).format(price.textContent)
})