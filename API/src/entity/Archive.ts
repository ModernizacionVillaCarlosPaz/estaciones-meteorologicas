import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Archive {
  @PrimaryColumn({ type: 'int', width: 11 })
  dateTime: number;

  @Column({ type: 'int' })
  usUnits: number;

  @Column({ type: 'int' })
  interval: number;

  @Column({ type: 'double', nullable: true })
  barometer: number | null;

  @Column({ type: 'double', nullable: true })
  pressure: number | null;

  @Column({ type: 'double', nullable: true })
  altimeter: number | null;

  @Column({ type: 'double', nullable: true })
  inTemp: number | null;

  @Column({ type: 'double', nullable: true })
  outTemp: number | null;

  @Column({ type: 'double', nullable: true })
  inHumidity: number | null;

  @Column({ type: 'double', nullable: true })
  outHumidity: number | null;

  @Column({ type: 'double', nullable: true })
  windSpeed: number | null;

  @Column({ type: 'double', nullable: true })
  windDir: number | null;

  @Column({ type: 'double', nullable: true })
  windGust: number | null;

  @Column({ type: 'double', nullable: true })
  windGustDir: number | null;

  @Column({ type: 'double', nullable: true })
  rainRate: number | null;

  @Column({ type: 'double', nullable: true })
  rain: number | null;

  @Column({ type: 'double', nullable: true })
  dewpoint: number | null;

  @Column({ type: 'double', nullable: true })
  windchill: number | null;

  @Column({ type: 'double', nullable: true })
  heatindex: number | null;

  @Column({ type: 'double', nullable: true })
  ET: number | null;

  @Column({ type: 'double', nullable: true })
  radiation: number | null;

  @Column({ type: 'double', nullable: true })
  UV: number | null;

  @Column({ type: 'int', nullable: true })
  extraTemp1: number | null;

  @Column({ type: 'double', nullable: true })
  extraTemp2: number | null;

  @Column({ type: 'double', nullable: true })
  heatingVoltage: number | null;

  @Column({ type: 'double', nullable: true })
  supplyVoltage: number | null;

  @Column({ type: 'double', nullable: true })
  referenceVoltage: number | null;

  @Column({ type: 'double', nullable: true })
  windBatteryStatus: number | null;

  @Column({ type: 'double', nullable: true })
  rainBatteryStatus: number | null;

  @Column({ type: 'double', nullable: true })
  outTempBatteryStatus: number | null;

  @Column({ type: 'double', nullable: true })
  inTempBatteryStatus: number | null;
}
