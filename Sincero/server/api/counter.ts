export default defineEventHandler(event => {
    // Read counter cookie
    let counter = getCookie(event, '__session') || 0
  
    // Increase counter cookie by 1
    // setCookie(event, 'counter', ++counter)
  
    // Send JSON response
    return { counter }
  })
  