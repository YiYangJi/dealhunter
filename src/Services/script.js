import bootstrap from "bootstrap";

//////////////////////////////////////////////////////////////////////////////////
// El hover para los textos que no quepan en el card de los Best Deals y Top Rated
//////////////////////////////////////////////////////////////////////////////////
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
