
/**
 * Concatenates a sequence of CSS classnames
 * @param  {...string} names CSS Classnames to concatenate
 */
const classNames = (...names) => {
    return names.join(" ");
}

export default classNames;
