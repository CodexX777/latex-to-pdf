const latex = require('node-latex')
const fs = require('fs')

const input = fs.createReadStream('./assets/iitbTemplate.tex')
const output = fs.createWriteStream('./output/output.pdf')
const pdf = latex(input)

pdf.pipe(output)
pdf.on('error', err => console.error(err))
pdf.on('finish', () => console.log('PDF generated!'));