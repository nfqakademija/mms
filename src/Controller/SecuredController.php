<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecuredController extends AbstractController
{
    /**
     * @Route("/secured", name="secured")
     */
    public function index()
    {
        return $this->render('secured/index.html.twig', [
            'controller_name' => 'SecuredController',
        ]);
    }
}
