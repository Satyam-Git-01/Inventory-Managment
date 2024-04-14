const itemList = document.getElementById("item_list");
function fetchData() {
  axios
    .get("https://crudcrud.com/api/58422580b991405ebab564782f5310eb/inventory")
    .then((response) => {
      const arr = response.data;
      for (let x of arr) {
        const li = document.createElement("li");
        li.innerHTML = `${x.itemName} ${x.itemDesc} ${x.price} ${x.quantity} <button onclick="edit('${x._id}','1')">Buy 1</buttton>   <button onclick="edit('${x._id}','2')">Buy 2</buttton>    <button onclick="edit('${x._id}','3')">Buy 3</buttton>`;
        itemList.appendChild(li);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function edit(id, quantity) {
  axios
    .get(
      `https://crudcrud.com/api/58422580b991405ebab564782f5310eb/inventory/${id}`
    )
    .then((r) => {
      console.log(r.data);
      let obj = {
        itemName: r.data.itemName,
        itemDesc: r.data.itemDesc,
        price: r.data.price,
        quantity: r.data.quantity - quantity,
      };
      console.log(obj)
      axios.put(
        `https://crudcrud.com/api/58422580b991405ebab564782f5310eb/inventory/${id}`,
         obj 
      ).then((response)=>{
        console.log(response);
      }).catch((err)=>{
        console.log(err)
      });
    });
}
fetchData();
function addItem(event) {
  event.preventDefault();
  const itemName = event.target.item_name.value;
  const itemDesc = event.target.item_description.value;
  const price = event.target.item_price.value;
  const quantity = event.target.item_quantity.value;
  const obj = {
    itemName,
    itemDesc,
    price,
    quantity,
  };
  //console.log(obj);
  postData(obj);
  fetchData();
}
function postData(Obj) {
  axios
    .post(
      "https://crudcrud.com/api/58422580b991405ebab564782f5310eb/inventory",
      Obj
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
