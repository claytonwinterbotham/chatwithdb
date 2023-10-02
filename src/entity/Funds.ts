import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("funds")
export class Fund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  fund_long_name: string;

  @Column({ type: "bigint" })
  initial_investment: number;

  @Column({ type: "varchar", length: 255 })
  fund_category: string;

  @Column({ type: "varchar", length: 255 })
  management_name: string;
}
