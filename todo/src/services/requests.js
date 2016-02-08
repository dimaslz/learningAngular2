export function getList() {
  this.http.get('http://localhost:8080/api/list')
    .subscribe(
      data => this.randomQuote = data,
      err => this.logError(err),
      () => console.log('Random Quote Complete')
    );
}

function logError(err) {
  console.error('There was an error: ' + err);
}