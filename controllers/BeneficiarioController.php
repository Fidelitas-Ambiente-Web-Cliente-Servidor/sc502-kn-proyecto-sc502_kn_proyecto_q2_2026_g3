<?php

require_once __DIR__ . '/../models/DonacionModel.php';

class BeneficiarioController
{
    private DonacionModel $model;

    public function __construct()
    {
        $this->model = new DonacionModel();
    }

    public function panel(): void
    {
        if (empty($_SESSION['usuario']) || $_SESSION['usuario']['rol'] !== 'beneficiario') {
            header('Location: index.php?controller=login&action=index');
            exit;
        }

        $disponibles = $this->model->getDisponibles();

        require __DIR__ . '/../views/beneficiario/panel.php';
    }
}
