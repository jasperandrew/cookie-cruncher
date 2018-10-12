function toggleClass(targets, name) {
    targets.forEach(target => {
        document.querySelector(target).classList.toggle(name)
    });
}