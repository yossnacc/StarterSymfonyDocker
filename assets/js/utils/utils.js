'use strict';

export function debounce(func, wait, immediate) {
    let timeout = 0;

    return function () {
        const context = this;
        const args = arguments;

        const later = function later() {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);

        if (callNow) func.apply(context, args);
    };
}

export function throttle(func, wait, options) {
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;

    if (!options) options = {};

    const later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    return function () {
        const now = Date.now();

        if (!previous && options.leading === false) previous = now;

        let remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            result = func.apply(context, args);

            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

export function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function loadImg(imgSrc) {
    return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = imgSrc;

        img.onload = function () {
            resolve(img);
        };

        img.onerror = function () {
            reject();
        };
    });
}

export function isIE() {
    return document.documentMode;
}

export function getViewportSize() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}

export function breakPointChecker(mediaquery, ifMatches, ifDoesntMatch) {
    if (!mediaquery) return;
    const breakpoint = window.matchMedia(mediaquery);

    trigger();
    breakpoint.addListener(trigger);

    function trigger() {
        if (ifMatches === undefined) {
            return breakpoint.matches;
        }

        if (breakpoint.matches) {
            ifMatches();
        } else if (typeof ifDoesntMatch === 'function') {
            ifDoesntMatch();
        }
    }
}

export function emptyElement(node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

export const easings = {
    linear: function (t) {
        return t;
    },
    easeInQuad: function (t) {
        return t * t;
    },
    easeOutQuad: function (t) {
        return t * (2 - t);
    },
    easeInOutQuad: function (t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function (t) {
        return t * t * t;
    },
    easeOutCubic: function (t) {
        return --t * t * t + 1;
    },
    easeInOutCubic: function (t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function (t) {
        return t * t * t * t;
    },
    easeOutQuart: function (t) {
        return 1 - --t * t * t * t;
    },
    easeInOutQuart: function (t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint: function (t) {
        return t * t * t * t * t;
    },
    easeOutQuint: function (t) {
        return 1 + --t * t * t * t * t;
    },
    easeInOutQuint: function (t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
};

export function getHeight(element, options = {}) {
    const {display = 'block', scrollHeight = true} = options;
    element.style.display = display;
    let maxHeight;

    if (scrollHeight) {
        maxHeight = element.scrollHeight + 'px';
    } else {
        element.style.maxHeight = 'none';
        maxHeight = element.clientHeight + 'px';
        element.style.maxHeight = '';
    }

    element.style.display = '';

    return maxHeight;
}

export function bodyBlock(bool) {
    const body = document.body;
    if (bool) {
        body.classList.add('is-blocked');
        body.style.top = `-${window.scrollY}px`;
        body.style.position = 'fixed';
    } else {
        body.classList.remove('is-blocked');
        const bodyTop = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(bodyTop || '0') * -1);
    }
}

export function isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
