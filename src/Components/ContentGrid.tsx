
import { ReactNode } from "react";
import "../styles/ContentGrid.css";
import Item from "./Item";
import { Card, Typography } from "@mui/material";
type contentGridProps = { title?: string; children: ReactNode };
function ContentGrid({ title = "List", children }: contentGridProps) {
  return (
    <>
      <tbody>
        <Card className="content">
          <Typography variant="h4" className="cart-header">{title}</Typography>
          <table className="content-header">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </table>
          {children}
        </Card>
      </tbody>
    </>
  );
}
export default ContentGrid;
