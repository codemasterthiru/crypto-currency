import styled from 'styled-components'

const TableContainer = styled.table `
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
`
const TableRow = styled.tr `
    &:nth-child(even)
    {
        background-color: grey;
    }
    .green{
        color: green;
    }
    .red{
        color:red;
    }
`
const TableHeader = styled.th `
    border: 1px solid #ddd;
    padding: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: gray;
`
const TableColumn = styled.td `
    border: 1px solid #ddd;
    padding: 8px;
`

export {
    TableContainer,
    TableRow,
    TableHeader,
    TableColumn,
}