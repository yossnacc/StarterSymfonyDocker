import { loadImg } from './utils';

export default function Lazimg(nodelist, params) {
    if (nodelist[0].tagName !== 'IMG') console.log('Nodes provided are not img');

    const options = params || {
        threshold: 0,
        rootMargin: '0px 0px 200px'
    };

    let observer;
    let nodelistLength = nodelist.length;
    let loaded = 0;

    return new Promise((resolve, reject) => {
        // Check IntersectionObserver API support
        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(nodelist, node => {
                loadImg(node.dataset.src).then(newImg => {
                    node.src = newImg.src;

                    if (options.callback && typeof options.callback === 'function') options.callback(node);
                });
            });
        } else {
            observer = new IntersectionObserver(intersected, options);

            Array.prototype.forEach.call(nodelist, item => {
                observer.observe(item);
            });
        }

        function intersected(entries) {
            Array.prototype.forEach.call(entries, entry => {
                if (entry.isIntersecting) {
                    loadImg(entry.target.dataset.src).then(() => {
                        entry.target.src = entry.target.dataset.src;
                        observer.unobserve(entry.target);
                        loaded++;
                        // console.log(loaded, nodelistLength);

                        if (options.callback && typeof options.callback === 'function') options.callback(entry.target);
                        if (loaded === nodelistLength) resolve();
                    });
                }
            });
        }
    });
}
