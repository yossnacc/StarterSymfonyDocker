<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => 'user.email',
                'attr' => [
                    'class' => 'form-control mb-3',
                    'placeholder' => 'user.email',
                    'autocomplete' => 'email'
                ],
                'translation_domain' => 'messages'
            ])
            ->add('plainPassword', RepeatedType::class, [
                'required' => false,
                'type' => PasswordType::class,
                'invalid_message' => 'user.error.samePassword',
                'first_options'  => [
                    'label' => 'user.password',
                    'attr' => [
                        'class' => 'form-control mb-3',
                        'placeholder' => 'user.password',
                        'autocomplete' => 'new-password'
                    ]],
                'second_options' => [
                    'label' => 'user.repeatPassword',
                    'attr' => [
                        'class' => 'form-control mb-3',
                        'placeholder' => 'user.repeatPassword',
                        'autocomplete' => 'new-password'
                    ]],
                'translation_domain' => 'messages'
            ])
            ->add('name', TextType::class, [
                'label' => 'user.name',
                'attr' => [
                    'class' => 'form-control mb-3',
                    'placeholder' => 'user.name',
                    'autocomplete' => 'family-name'
                ],
                'translation_domain' => 'messages'
            ])
            ->add('firstname', TextType::class, [
                'label' => 'user.firstname',
                'attr' => [
                    'class' => 'form-control mb-3',
                    'placeholder' => 'user.firstname',
                    'autocomplete' => 'given-name'
                ],
                'translation_domain' => 'messages'
            ])
        ;
        if ($options['terms']){
            $builder->add('terms', CheckboxType::class, [
                'label' => 'user.terms',
            ]);
        }

        if ($options['oldPassword']){
            $builder->add('oldPassword', PasswordType::class, [
                'required' => false,
                'label' => 'user.password',
                'attr' => [
                    'placeholder' => 'user.password',
                    'autocomplete' => 'current-password'
                ],
            ]);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'terms' => null,
            'oldPassword' => null,
        ]);
    }
}
