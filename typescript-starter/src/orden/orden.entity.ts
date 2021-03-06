import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ClienteEntity} from "../cliente/cliente.entity";
import {BebidaEntity} from "../../dist/bebida/bebida.entity";
import {PlatoEntity} from "../../dist/plato/plato.entity";
import {ComboEntity} from "../../dist/combo/combo.entity";


@Entity('orden')
export class OrdenEntity {

    @PrimaryGeneratedColumn()
    idOrden: number;

    @ManyToOne(
        type => ClienteEntity,
        clienteEntity => clienteEntity.orden)

    cliente: ClienteEntity;

    @OneToMany(
        type => PlatoEntity,
        platoEntity => platoEntity.menu)

    plato: PlatoEntity[];

    @OneToMany(
        type => BebidaEntity,
        bebidaEntity => bebidaEntity.menu)

    bebida: BebidaEntity[];

    @OneToMany(
        type => ComboEntity,
        comboEntity => comboEntity.menu)

    combo: ComboEntity[];
}