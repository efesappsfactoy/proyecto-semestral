import {Body, Controller, Get, HttpCode, Post, ReflectMetadata, Req, Res, UseGuards} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioPipe} from "./pipes/usuario.pipe";
import {USUARIO_SCHEMA} from "./cliente/cliente.schema";
import {CrearUsuarioGuard} from "./guards/crear-usuario.guard";

// decorator
@Controller('Usuario')
@UseGuards(CrearUsuarioGuard)

export class UsuarioController {
    usuario = {
        nombre: 'Adrian',
        apellido: 'Eguez',
        edad: 28
    };

    usuarios = [];

    constructor(private _usuarioService: UsuarioService) {

    }

    @HttpCode(202)
    @Get('mostrar')
    @ReflectMetadata('permisos', {
        permisos: 'publico',
        roles: [
            'usuario',
            'administrador'
        ]
    })


    mostrarUsuario(
        @Res() response
    ) {
        const usuarios = this._usuarioService.mostrarUsuarios();
        return response.send(usuarios);
    }

    @Get('mostrarExpress')
    mostrarUsuarioExpress(
        @Req() request,
        @Res() response
    ) {
        return response
            .status(200)
            .send(this.usuarios);
    }

    @Post('crearUsuario')
    @ReflectMetadata('permisos', ['privado'])

    crearUsuario(
        @Body(new UsuarioPipe(USUARIO_SCHEMA))
            nuevoUsuario
    ) {

        const usuarioCreado = this._usuarioService.crearUsuario(nuevoUsuario);

        return nuevoUsuario;
    }


}

